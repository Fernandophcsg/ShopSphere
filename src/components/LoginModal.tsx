import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";
import { useState } from "react";

interface LoginModalProps {
    open: boolean;
    handleOpen: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, handleOpen }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        console.log(formData);
        localStorage.setItem("user", JSON.stringify(formData.email));
            handleOpen();
    };
    
    return (
        <>
            <Dialog
                size="md"
                open={open}
                handler={handleOpen}
                placeholder={""}
                className="w-screen flex items-center justify-center min-h-screen !bg-transparent shadow-none"
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}

            >
                <Card
                    placeholder={""}
                    className="mx-auto w-full max-w-[24rem]"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                >
                    <CardBody
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        className="flex flex-col gap-4"
                        placeholder=""
                    >
                        <Typography
                            variant="h4"
                            color="blue-gray"
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                        >
                            Sign In
                        </Typography>
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                        >
                            Enter your email and password to Sign In.
                        </Typography>
                        <Typography
                            className="-mb-2"
                            variant="h6"
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                        >
                            Your Email
                        </Typography>
                        <Input 
                            label="Email" 
                            size="lg" 
                            onPointerEnterCapture={() => {}} 
                            onPointerLeaveCapture={() => {}} 
                            crossOrigin=""
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <Typography
                            className="-mb-2"
                            variant="h6"
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                        >
                            Your Password
                        </Typography>
                        <Input 
                            label="Password" 
                            size="lg" 
                            onPointerEnterCapture={() => {}} 
                            onPointerLeaveCapture={() => {}} 
                            crossOrigin=""
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <div className="-ml-2.5 -mt-3">
                            <Checkbox 
                                label="Remember Me" 
                                onPointerEnterCapture={() => {}} 
                                onPointerLeaveCapture={() => {}} 
                                crossOrigin=""
                            />
                        </div>
                    </CardBody>
                    <CardFooter 
                        className="pt-0" 
                        placeholder="" 
                        onPointerEnterCapture={() => {}} 
                        onPointerLeaveCapture={() => {}} 
                    >
                        <Button
                            variant="gradient"
                            onClick={handleSubmit}
                            fullWidth
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                            
                        >
                            Sign In
                        </Button>
                        <Typography
                            placeholder={""}
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                            variant="small"
                            className="mt-4 flex justify-center"
                        >
                            Don&apos;t have an account?
                            <Typography
                                as="a"
                                href="#signup"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                                onClick={handleOpen}
                                placeholder=""
                                onPointerEnterCapture={() => {}}
                                onPointerLeaveCapture={() => {}}
                            >
                                Sign up
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
};

export default LoginModal;