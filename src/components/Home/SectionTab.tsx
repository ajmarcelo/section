import { SectionDataType } from '../../utils/constant';

interface SectionTabProps {
    isMobile: boolean;
    section: SectionDataType;
}

const SectionTab = ({ isMobile, section }: SectionTabProps) => {
    return (
        <div className={`p-10 border border-slate-500 bg-slate-200 ${!isMobile && "rounded-b-lg"}`} >
            <div dangerouslySetInnerHTML={{ __html: section?.content}} />
        </div>
    )
}

export default SectionTab