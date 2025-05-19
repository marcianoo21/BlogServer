import { Input } from '@headlessui/react'

export const Login = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div>
            <Input name="full_name" type="text" className="border data-focus:bg-blue-100 data-hover:shadow" />
            <p className='text-3xl text-red-500'>Enter your full name</p>
        </div>
    </div>
  )
}
