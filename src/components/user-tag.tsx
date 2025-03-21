import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const UserTag = ({
  logo,
  username,
  email,
}: {
  logo: string
  username: string
  email: string
}) => {
  return (
    <>
      <Avatar className='h-6 w-6 roudned-lg'>
        <AvatarImage src={logo} />
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span className='truncate'>{username}</span>
        <span className='truncate text-xs text-muted-foreground'>{email}</span>
      </div>
    </>
  )
}

export default UserTag
