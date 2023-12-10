import { CardList } from './CardList';
import contents from './content';

export default function Card(){
    return(
        <div className='flex justify-center items-center mb-10'>
            <div className='grid lg:grid-cols-[350px_350px_350px] md:grid-col-2 sm:grid-cols-1 justify-center h-[500px] overflow-y-scroll max-w-5xl overflow-x-hidden m-10'>
            {contents.map(contents => (
                <CardList
                key={contents.id}
                image={contents.image}
                name={contents.name}
                link={contents.link}
                javascript={contents.javascript}
                html={contents.html}
                css={contents.css}
                react={contents.react}
                bootstrap={contents.bootstrap}
                 />
            ))}
        </div>
        </div>
        
    )
}