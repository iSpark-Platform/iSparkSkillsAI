import { Wrapper } from "@/layout";
import RegisterMain from "@/components/Register";

export const metadata = {
  title: 'Login '
}

const RegisterPage = () => {
    return (
        <Wrapper>
            <RegisterMain />
        </Wrapper>
    )
}

export default RegisterPage;