import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect } from 'react';

function PersonalDetail({enableNext}) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResumeInfo({...resumeInfo,[name]:value})
   

    };

    const onSave = (e) => {
        e.preventDefault();
        enableNext(true);
    };

 

    return (
        <div className='p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary'>
            <h2 className='text-lg font-bold'>Personal Detail</h2>
            <p>Get Started with the Basic information</p>
            <form onSubmit={onSave}>
                <div className="grid grid-cols-2 gap-3 mt-5">
                    <div>
                        <label className='text-sm font-bold'>First Name</label>
                        <Input name="firstName" required onChange={handleInputChange} defaultValue={resumeInfo.firstName} />
                    </div>
                    <div>
                        <label className='text-sm font-bold'>Last Name</label>
                        <Input name="lastName" required onChange={handleInputChange} defaultValue={resumeInfo.lastName} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm font-bold'>Job Title</label>
                        <Input name="jobTitle" required onChange={handleInputChange} defaultValue={resumeInfo.jobTitle} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm font-bold'>Address</label>
                        <Input name="address" required onChange={handleInputChange} defaultValue={resumeInfo.address} />
                    </div>
                    <div>
                        <label className='text-sm font-bold'>Phone</label>
                        <Input name="phone" required onChange={handleInputChange} defaultValue={resumeInfo.phone} />
                    </div>
                    <div>
                        <label className='text-sm font-bold'>Email</label>
                        <Input name="email" required onChange={handleInputChange} defaultValue={resumeInfo.email} />
                    </div>
                </div>
                <div className='flex justify-end mt-3'>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetail;
