const profileDetails = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "1234567890",
    address: "1234 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94123",
    country: "USA",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
}

const MyProfile = () => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-4 py-10 px-20">
        <h1 className="text-2xl font-bold ">My Profile</h1>
        <div className="w-full h-auto flex gap-10">
            <img src={profileDetails.avatar} alt="profile" className="w-[20rem] aspect-square rounded-md" />
            <div className="flex flex-col gap-2 ">
                <p className="text-xl font-bold">{profileDetails.name}</p>
                <p>{profileDetails.email}</p>
                <p>{profileDetails.phone}</p>
                <p>{profileDetails.address}</p>
                <p>{profileDetails.city}</p>
                <p>{profileDetails.state}</p>
                <p>{profileDetails.zip}</p>
                <p>{profileDetails.country}</p>

            </div>
        </div>
    </div>
  )
}

export default MyProfile