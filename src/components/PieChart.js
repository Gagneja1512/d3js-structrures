import * as d3 from 'd3'
import { useState, useEffect, useRef } from 'react'

const PieChart = () => {
    const [data] = useState([
        { property: 'a', value: 5 },
        { property: 'b', value: 15 },
        { property: 'c', value: 5 },
        { property: 'd', value: 25 },
        { property: 'e', value: 2 }
    ])

    const svgRef = useRef()

    useEffect(() => {
        //setting up the svg container 
        const w = 500;
        const h = 500;
        const r = w / 2;

        const svg = d3.select(svgRef.current).attr('width', w).attr('height', h)
            .style('overflow', 'visible').style('margin-top', '400px')


        // Setting up the chart
        const formattedData = d3.pie().value(d => d.value)(data)
        const arcGenerator = d3.arc().innerRadius(0).outerRadius(r)
        const color = d3.scaleOrdinal().range(d3.schemeSet3)


        //Set up the svg data
        svg.selectAll().data(formattedData).join('path').attr('d', arcGenerator)
            .attr('fill', d => color(d.value)).style('opacity', 1)


        // setting up annotation 
        svg.selectAll().data(formattedData).join('text').text(d => d.data.property).attr('transform', d => `translate(${arcGenerator.centroid(d)})`).style('text-anchor', 'middle')

    }, [data])

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}

export default PieChart