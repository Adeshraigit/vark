import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function Redirect() {

    const navigate = useNavigate();
    const { user } = useUser(); 
    const preference = user?.publicMetadata.preference;
    // console.log(user?.publicMetadata.preference);

    useEffect(() => {
        if (preference) {
            navigate(`/${preference}`);
        }
    }, [navigate]);

  return (
    <div>redirect</div>
  )
}

export default Redirect;