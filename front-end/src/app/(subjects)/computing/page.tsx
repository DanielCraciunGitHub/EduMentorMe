import axios, { AxiosResponse } from 'axios';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export default async function page() {
  const res: AxiosResponse<ApiResponse> = await axios.get('http://127.0.0.1:1337/api/internals');
  const responseData: ApiResponse = res.data;
  return (
    <div className='flex text-white justify-center items-center flex-col m-5'>
        {responseData.data.map((element) => (
          <div key={element.id} className='p-4'>
            <h1 className='text-2xl'>
              <ReactMarkdown>
                {element.attributes.title}
              </ReactMarkdown>
            </h1>
          </div>
        ))}
    </div>
  )
}
