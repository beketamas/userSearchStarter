import { useState, useEffect } from "react"

type user= {
    id: number,
    name: string,
    email : string,
    age: number,
    profilePicture: string
}

const UserCard = () => {

const [searchUser, setSearchUser] = useState<string>();
const [userArray, setUserArray] = useState<user[]>([])
const [user, setUser] = useState<user | null>();
const [error, setError] = useState<string | null>();

const handleSearchUserChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value)
} 

const fetchUsers = async() => {

    try {
        const response = await fetch('/users.json')
        if (!response.ok) {
            throw new Error
        }
        const data = await response.json()
        setUserArray(data.users)
        //console.log(data)
        
    } catch (error) {
        console.error(error)
    }
}

useEffect(() => {
    fetchUsers()
}, [])

const hadnleSearchButton = () => {

    if (searchUser) {
        const foundUser = userArray.find(u => u.name.toLowerCase().includes(searchUser?.toLowerCase()))
        if (foundUser) {
            setUser(foundUser)
            setError(null)
        }
        else
        {
            setError("No user found with the given name.")
            setUser(null)
        }
    }

}

  return (
    <div className="user-card">
        <div className="search-section">
            <input value={searchUser} onChange={handleSearchUserChange} type="text" />
            <button onClick={hadnleSearchButton}>Search</button>
        </div>

        <div className="results-section">
            {error && <p>{error}</p>}
            {user && <>
                <img src={user?.profilePicture} alt="" />
                <div className="user-info">
                    <p>ID: {user?.id}</p>
                    <p>Name: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                    <p>Age: {user?.age}</p>
                </div>
            </>}
        </div>
    </div>
  )
}

export default UserCard