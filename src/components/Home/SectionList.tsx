import { useEffect, useState } from 'react'
import { SectionDataType } from '../../utils/constant'
import SectionTab from './SectionTab';

interface SectionListProps {
    data: SectionDataType[],
    title: string
}

function SectionList({ data, title }: SectionListProps){ 
    const [activeTab, setActiveTab] = useState(0);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect screen size

    useEffect(() => {
        // Function to update screen size on resize
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Sync activeTab based on activeAccordion and screen size changes
    useEffect(() => {
        if(activeAccordion === null) {
            if(!isMobile)
                setActiveAccordion(0)
            setActiveTab(0)
        }
        else {
            setActiveTab(activeAccordion)
        }
        // console.log("tab: ", activeTab, "acc: ", activeAccordion)
    }, [activeAccordion, isMobile]);

    // Sync activeAccordion based on activeTab and screen size changes
    useEffect(() => {
        if(!isMobile)
            setActiveAccordion(activeTab)
        // console.log("tab: ", activeTab, "acc: ", activeAccordion)
    }, [activeTab, isMobile])

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <h1 className='font-bold text-xl'>{title}</h1>
            {isMobile ? (
                // Accordion for Mobile
                <div className="border-t border-slate-500">
                    {data.map((section, index) => (
                        <div key={index} className="">
                            <button
                                className={`font-bold w-full p-3 flex justify-between items-center text-left text-xl border-x border-b border-slate-500 ${activeAccordion === index ? "border-0 bg-slate-500 text-black" : "bg-slate-300 text-black"}`}
                                onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                            >
                                {section.title}
                                <span>{activeAccordion === index ? "▲" : "▼"}</span>
                            </button>
                            {activeAccordion === index && (
                                <SectionTab isMobile={isMobile} section={section}/>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                //  Tabs for Desktop
                <div className="">
                    <div className="flex">
                        {data.map((section, index) => (
                            <button
                                key={index}
                                className={`font-bold p-3 flex-1 text-center border border-b-0 border-white rounded-t-lg ${
                                    activeTab === index ? "border border-slate-500 bg-slate-500 text-black" : "bg-slate-300 text-black"
                                }`}
                                onClick={() => setActiveTab(index)}
                            >
                                {section.title}
                            </button>
                        ))}
                    </div>
                    <SectionTab isMobile={isMobile} section={data[activeTab]}/> 
                </div>
            )}
        </div>
    )
}

export default SectionList