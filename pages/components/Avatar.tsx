import { useRouter } from "next/router";
import { useCallback } from "react";

import useUser from "../hooks/useUser";
import Image from "next/image";

interface AvatarProps {
    userId:string;
    isLarge?:boolean;
    hasBorder?: boolean;
}

const Avatar:React.FC<AvatarProps> =({
    userId,
    isLarge,
    hasBorder
})=>{

    const router = useRouter()
    // 根据id请求头像
    const {data:fetchedUser} = useUser(userId)

    const onClick = useCallback((e:any)=>{
        e.stopPropagation()

        const url = `/users/${userId}`
        router.push(url)
    },[router,userId])

    return (
        <div className={`
            ${isLarge?'h-32':'h-12'}
            ${isLarge?'w-32':'w-12'}
            ${hasBorder?"border-4 border-black":''}
            relative
            rounded-full
            transition
            hover:opacity-90
            cursor-pointer
        `}>
           <Image 
                fill
                style={{
                    objectFit:'cover',
                    borderRadius:'100%'
                }}
                alt="Avatar"
                onClick={onClick}
                src={fetchedUser?.profileImage || '/images/person.svg'}
                className="bg-neutral-200"
           />
        </div>
    )
}

export default Avatar