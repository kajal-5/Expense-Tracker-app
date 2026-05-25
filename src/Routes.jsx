import ExpenseForm from "./Components/Expence-form";
import EditForm from "./Components/EditForm";
import { Routes, Route } from "react-router-dom";

function Routesfile(){


    let navigate = useNavigate();
    return(
        <Routes>
            <Route path = '/' element = { <ExpenseForm/> } />
            <Route path = '/edit' element = { <EditForm/> } />
        </Routes>
    );

}
export default Routesfile;