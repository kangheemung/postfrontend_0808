
import React, { useEffect, useState } from 'react'

export default function MyPage({ token }) {
    const [userData, setUserData] = useState({})
    useEffect(() => {
        const fetchMyPage = async () => {
            const response = await fetch('http://18.176.21.52:8080/mypage', {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ${token}' },
            });
            const data = await response.json();
            console.log(data);
        }
        fetchMyPage()
    }
        , [token])
    return (
        <div>MyPage
            username: {userData.name}<br />
            email: {userData.email}<br />
        </div>
    )
}