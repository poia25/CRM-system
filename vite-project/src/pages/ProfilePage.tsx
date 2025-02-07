import { useEffect, useState } from "react"
import { ProfileRequest } from '../types/user.ts'
import { getProfile } from "../store/actionCreators"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../store/store';


export const ProfilePage = () => {
  const [data, setData] = useState<ProfileRequest>({
    username: "wait",
    email: "wait",
    phoneNumber: "wait",
  })
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.auth.profileData.profile)
  useEffect(() => {
    dispatch(getProfile() as any)
  },[dispatch])
  return (
    <>
    <p>Email:{profile?.email}</p>
    <p>UserName:{profile?.username}</p>
    <p>PhoneNumber:{profile?.phoneNumber}</p>
    </>
  )
}


export default ProfilePage