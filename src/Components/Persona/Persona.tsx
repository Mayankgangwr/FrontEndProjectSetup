import { FC } from "react";
import { Persona as PersonaComponent, PersonaProps } from "@fluentui/react-components";
interface IPersonaState extends PersonaProps {

}
const Persona: FC<IPersonaState> = (props) => {
    const { name } = props;
    return (
        <PersonaComponent name={name} className="" />
    )

}
export default Persona;