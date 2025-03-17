// Icons
import CopyIcon from "@assets/svg/copy.svg";
import { StyledCheckedIcon, StyledIcon, StyledParagraph } from "./styled";

type TextCopyProps = {
	children: string | number | undefined;
};

const TextCopy: React.FC<TextCopyProps> = ({ children }) => {
	return (
		<StyledParagraph
			copyable={{
				icon: [<StyledIcon src={CopyIcon} />, <StyledCheckedIcon />],
				tooltips: ["Sao chép", "Đã sao chép"],
			}}
		>
			{children}
		</StyledParagraph>
	);
};

export default TextCopy;
