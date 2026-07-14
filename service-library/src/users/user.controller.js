`use strict`;

import { User } from './user.model.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ status: true }).select('-__v');
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-__v');
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el usuario', error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { _id, name, email, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
        }

        const user = new User({ _id, name, email, role });
        await user.save();

        res.status(201).json({ success: true, message: 'Usuario creado exitosamente', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el usuario', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            { new: true, runValidators: true }
        ).select('-__v');

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Usuario actualizado', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el usuario', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el usuario', error: error.message });
    }
};
