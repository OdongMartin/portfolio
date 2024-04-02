import { useState } from 'react';
import { Toaster, toast } from 'sonner'

interface FormData {
  name: string;
  email: string;
  message: string;
}


export default function FeedbackForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData((prevFormData) => ({ ...prevFormData, message: '' }));
        // show success message to the user
        //alert('Feedback sent successfully');
        toast.success('Feedback sent successfully');

        console.log('Feedback sent successfully');
      } else {
        toast.error('Failed to send feedback');
        console.error('Failed to send feedback');
        // alert('Failed to send feedback');

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Toaster richColors/>
      <form className='grid gap-2 items-center justify-center text-black' onSubmit={handleSubmit}>
        <span className='text-white mb-4 text-xl font-bold'>FeedBack</span>
        <label className='text-white'>Name</label>
        <input className='rounded-lg' type="text" name="name" value={formData.name} onChange={handleChange} />
        <label className='text-white mt-4'>Email</label>
        <input className='rounded-lg' type="email" name="email" value={formData.email} onChange={handleChange} />
        <label className='text-white mt-4'>Message</label>
        <textarea className='rounded-lg' required name="message" value={formData.message} onChange={handleChange}></textarea>
        <button type="submit" className='text-white border-2 rounded-lg w-fit p-1 flex items-center justify-center hover:border-green-500 hover:text-green-500 transition-colors ease-in-out duration-500'>Submit</button>
      </form>
    </>
  );
}