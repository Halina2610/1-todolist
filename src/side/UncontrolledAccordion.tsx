import {FC, useState} from "react";

type AccordionPropsType = {
    title?: string,
    onClickHandler?: () => void
}


export const UncontrolledAccordion: FC<AccordionPropsType> = ({title}) => {

    const [open, setOpen] = useState<boolean>(false)


    const toggleAccordion = () => {
        setOpen(open => !open)
    }

    return (
        <div>

            <AccordionTitle title={title} onClickHandler={toggleAccordion}/>

            {open && <div><AccordionBody/></div>}


        </div>
    )

}


const AccordionTitle = ({title, onClickHandler}: AccordionPropsType) => {
    return (
        <h3 onClick={onClickHandler}>{title}</h3>
    )
}

const AccordionBody = () => {

    return (
        <>

            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>


        </>
    )
}