import { useTheme } from "./../../../context/ThemeContext";
import Avatar from "./../../../components/atoms/avatar/Avatar"
import "./avatar-information.scss"

interface AvatarInformationProps {
    name: string,
    additionalInformation?: string,
    subadditionalInformation?: string
}

export default function AvatarInformation({ name, additionalInformation, subadditionalInformation }: AvatarInformationProps) {
    const { theme } = useTheme();
    return <section className="avatar-information">
        <Avatar name={name} />
        <div>
            <p style={{
                color: theme.textColor
            }}>{additionalInformation}</p>
            <p style={{
                color: theme.textColor
            }}>{subadditionalInformation}</p>
        </div>
    </section>
}

