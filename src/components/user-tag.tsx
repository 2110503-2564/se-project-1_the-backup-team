import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const UserTag = ({
  logo,
  name,
  email,
}: {
  logo: string
  name: string
  email: string
}) => {
  const splited_name = name.split(' ')
  if (splited_name.length >= 2) {
    name = splited_name[0] + ' ' + splited_name[1][0] + '.'
  }
  return (
    <>
      <Avatar className='h-6 w-6 roudned-lg'>
        <AvatarImage src={logo} />
        <AvatarFallback>
          <div className='size-full bg-muted'></div>
        </AvatarFallback>
      </Avatar>
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span className='truncate'>{name}</span>
        <span className='truncate text-xs text-muted-foreground'>{email}</span>
      </div>
    </>
  )
}

export default UserTag
