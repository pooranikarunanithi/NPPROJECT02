import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import {useSelector,useDispatch} from 'react-redux';
import { getAccountStatus } from "../actions/stripe";


const StripeCallback = ({ history }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (user && user.token) accountStatus();
    }, [user]);
  
    const accountStatus = async () => {
      try {
        const res = await getAccountStatus(user.token);
        console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK", res);
      } catch (err) {
        console.log(err);
      }
    };
 
    return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="display-1 p-5 text-danger" />
    </div>
  );
};

export default StripeCallback;
