
import BlogCard from '@/src/components/blog/BlogCard';
import { getAllBlogs } from '@/src/services/blogs';
import { TBlogs } from '@/src/types';
import PageSection from '@/src/utilits/PageSection';
import React from 'react';

const page = async () => {
    const {data:blogs} = await getAllBlogs()
    return (
        <div>
            <PageSection second="Blogs" />
            <div className="Container lg:px-20 py-8 mt-4">
                <div className='grid lg:grid-cols-3 gap-6'>
                    {
                        blogs?.map((blog: TBlogs) => <BlogCard key={blog._id} blog={blog}/>)
                    }
                </div>
            </div>
           
        </div>
    );
};

export default page;