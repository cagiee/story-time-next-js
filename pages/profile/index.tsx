import Image from "next/image";
import styles from "./Profile.module.scss";
import Button from "@/components/ui/Button/Button";
import Textfield from "@/components/ui/Textfield/Textfield";
import { useAuth } from "@/stores/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cropper from "react-easy-crop";
import { useRepositories } from "@/contexts";
import { toast } from "sonner";
import Dialog from "@/components/ui/Dialog/Dialog";
import { getCroppedImg } from "@/utils/canvas";

interface IFormUpdateProfile {
    name: string;
    about: string;
}

export default function Profile() {
    // External variables
    const authStore = useAuth();
    const api = useRepositories();
    const { user } = authStore;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IFormUpdateProfile>({
        defaultValues: {
            name: user?.name,
            about: user?.about,
        },
    });

    // States
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmSubmitDialog, setShowConfirmSubmitDialog] =
        useState(false);
    const [showCropperDialog, setShowCropperDialog] = useState(false);
    const [pendingSubmitData, setPendingSubmitData] =
        useState<IFormUpdateProfile>();
    const [imageSrc, setImageSrc] = useState(
        "https://i.pinimg.com/1200x/a6/aa/5d/a6aa5d80551d471078f799e1473c20fb.jpg"
    );
    const [profileImage, setProfileImage] = useState<Blob>();

    // States for Cropping
    const [tempImage, setTempImage] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const showCroppedImage = async () => {
        if (!tempImage) {
            return;
        }

        try {
            const croppedImage = await getCroppedImg(
                tempImage,
                croppedAreaPixels
            );
            if (croppedImage && croppedImage.url) {
                setImageSrc(croppedImage.url);
            }
            if (croppedImage && croppedImage.blob) {
                setProfileImage(croppedImage.blob);
            }
            setShowCropperDialog(false);
        } catch (e) {
            console.error(e);
        }
    };
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Functions
    const onCropComplete = useCallback((_: any, clippedPixels: any) => {
        setCroppedAreaPixels(clippedPixels);
    }, []);
    const onSubmit: SubmitHandler<IFormUpdateProfile> = async (data) => {
        setPendingSubmitData(data);
        setShowConfirmSubmitDialog(true);
    };
    const submitAction = async () => {
        setShowConfirmSubmitDialog(false);
        const data = pendingSubmitData;

        if (!data) {
            return toast.error("Data is missing!");
        }

        try {
            setIsLoading(true);
            const { data: response } = await api.auth.updateProfile({
                body: {
                    name: data.name,
                    about:
                        data.about ||
                        "This user was too lazy to describe him/her self",
                },
            });
            authStore.setUser(response.data.user);
            toast.success("Profile updated succesfuly!");
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setTempImage(previewUrl);
        setShowCropperDialog(true);
    };

    // useEffects
    useEffect(() => {
        reset({
            name: user?.name,
            about: user?.about,
        });
    }, [user]);
    useEffect(() => {
        if (!showCropperDialog) {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }, [showCropperDialog]);

    return (
        <>
            <form className={styles.profile} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles["profile__title-wrapper"]}>
                    <h1 className={styles.profile__title}>Profile</h1>
                    <Button
                        type="submit"
                        text="Save Changes"
                        loading={isLoading}
                    />
                </div>
                <div>
                    <hr className="divider" />
                </div>
                <div className={styles["profile__image-wrapper"]}>
                    <div className={styles["profile__image"]}>
                        <Image src={imageSrc} alt="profile image" fill />
                    </div>
                    <div className={styles["profile__image-button"]}>
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                accept="image/*"
                            />
                            <Button
                                text="Change Picture"
                                variant="outlined"
                                onClick={() => handleButtonClick()}
                            />
                        </div>
                        <span>Please upload a PNG or JPEG file under 5MB.</span>
                    </div>
                </div>
                <Textfield
                    type="text"
                    {...register("name", {
                        required: "Name is required",
                        maxLength: {
                            value: 24,
                            message: "Nama length can not exceed 24 character",
                        },
                    })}
                    placeholder="Enter your name"
                    errorMessage={errors.name?.message}
                    label="Name *"
                />
                <Textfield
                    type="email"
                    label="Email *"
                    disabled
                    value={user?.email}
                />
                <Textfield
                    {...register("about", {
                        maxLength: {
                            value: 100,
                            message:
                                "Email length can not exceed 100 character",
                        },
                    })}
                    errorMessage={errors.about?.message}
                    type="text"
                    label="About Me"
                    placeholder="Describe yourself"
                />
            </form>
            <Dialog
                isOpen={showConfirmSubmitDialog}
                title="Save changes to your profile?"
                description="Any updates you’ve made will be visible to others immediately."
                showConfirmButton
                confirmButtonText="Save Changes"
                showCancelButton
                onClose={() => setShowConfirmSubmitDialog(false)}
                onConfirm={() => submitAction()}
                align="center"
            ></Dialog>
            <Dialog
                isOpen={showCropperDialog}
                onClose={() => {
                    setShowCropperDialog(false);
                }}
                title="Change Profile Picture"
                description="Adjust the positioning and scale to ensure your portrait is correctly framed"
                showConfirmButton
                confirmButtonText="Upload"
                onConfirm={showCroppedImage}
                showCancelButton
            >
                {tempImage && (
                    <div
                        style={{
                            position: "relative",
                            width: "500px",
                            height: "500px",
                            margin: "auto",
                        }}
                    >
                        <Cropper
                            image={tempImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={1 / 1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            objectFit="cover"
                        />
                    </div>
                )}
            </Dialog>
        </>
    );
}
