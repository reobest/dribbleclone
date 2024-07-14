import {useState }  from 'react'
import { collection, getDocs , deleteDoc ,doc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
export const fetchProjects = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Projects"));
        const fetchedProjects: any = [];
        querySnapshot.forEach((doc) => {
            fetchedProjects.push({ id: doc.id, ...doc.data() });
        });
        return fetchedProjects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};
export const generateRandomLikes = () => {
    return Math.floor(Math.random() * 10000);
};

export const generateRandomViews = () => {
    return `${(Math.floor(Math.random() * 10000) / 1000).toFixed(1)}k`;
};
