import React, { useEffect, useState } from 'react';
import {userService} from '../_services'

const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [load, setLoad] = useState(true)
    const [reload, setReload] = useState(0)

    useEffect(() => {
        userService.getAllUsers()
            .then(res => {
                setUsers(res.data.data)
                setLoad(false)
            })
            .catch(err => console.error('BOUM', err))
    }, [reload])

    /***************************************************************** */

    const delUser = (userId) => {
        userService.deleteUser(userId)
            .then(res => {
                // Mise à jour du state pour affichage
                setUsers((current) => current.filter(user => user.id !== userId))
            })
            .catch(err => console.log(err))
    }

    // Gestion de la modification des champs du formulaire
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    // Gestion de la soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault()

        userService.addUser(user)
            .then(res => {
                console.log(res) 
                setReload(prevState => prevState+1)
            })
            .catch(err => console.log(err))
    }

    /**************************************************************** */

    if(load){
        return <div>Loading ....</div>
    }

    return (
        <section className='blurp'>
            <div className="User">
                User liste       
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.id}>
                                    <td><span className='del_ubtn' onClick={() => delUser(user.id)}>X</span></td>
                                    <td>{user.id}</td>
                                    <td>{user.nom}</td>
                                    <td>{user.prenom}</td>
                                    <td>{user.email}</td>
                                    <td>{user.createdAt}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="formulaire">
            User Add
            <form onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" name="nom" onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" name="prenom" onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" onChange={onChange} />
                </div>
                <div className="group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" onChange={onChange} />
                </div>
                <div className="group">
                    <button>Ajouter</button>
                </div>
            </form>
            </div>
        </section>
    );
};

export default Dashboard;