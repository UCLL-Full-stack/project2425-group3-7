import React, { useEffect, useState } from 'react';
import { User } from '../../types';
import UserService from '../../services/UserService';

const UserOverview: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await UserService.getUsers();
                const data = await response.json();
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('API response is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Film Lijst</h1>           
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Username</th>
                        <th className="py-2 px-4 border-b">First Name</th>
                        <th className="py-2 px-4 border-b">Last Name</th>
                        <th className="py-2 px-4 border-b">Password</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Birthday</th>
                        <th className="py-2 px-4 border-b">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b">{user.id}</td>
                            <td className="py-2 px-4 border-b">{user.username}</td>
                            <td className="py-2 px-4 border-b">{user.firstName}</td>
                            <td className="py-2 px-4 border-b">{user.lastName}</td>
                            <td className="py-2 px-4 border-b">{user.password}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{new Date(user.birthday!).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserOverview;