import { useEffect, useState } from 'react'
import { SectionDataType } from '../../utils/constant'
import sectionData from "../../data/data.json" 
import SectionList from '../../components/Home/SectionList'

function Home() {
    
    const [data, setData] = useState<SectionDataType[]>([])

    const fetchData = () => {
        try {
            const sections = sectionData.map((section) => ({
                title: section.title, 
                content: section.content
            }))
            setData(sections)

        } catch (err) {
            console.log("Error: Can't read data file", err)
        }
    }
    
    useEffect(()=>{
        fetchData()
    },[])
    
    useEffect(() => {
        console.log("Updated:", data);
    }, [data]); // triggered when data is updated

    return (
    <div className= "">
        <SectionList data={data} title="Sections"/>
    </div>
    )
}

export default Home