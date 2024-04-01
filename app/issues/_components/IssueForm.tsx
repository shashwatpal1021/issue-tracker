'use client';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/validationSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';


const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
);

type IssueFormDatat = z.infer<typeof createIssueSchema>;

// interface Props {
//   issue?: Issue;
// }

const IssueForm = ({ issue }: { issue?: Issue; }) => {
  const router = useRouter();

  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormDatat>({
    resolver: zodResolver(createIssueSchema)
  });
  // console.log(register('title'))

  const [error, setError] = useState('');
  const [isSubmiting, setSubmiting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmiting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      // console.log(error);
      setSubmiting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color="red" className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form className='max-w-xl space-y-3' onSubmit={onSubmit}
      >
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) =>
            <SimpleMDE placeholder='Description' {...field} />
          } />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmiting}>Submit New Issue {isSubmiting && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default IssueForm;