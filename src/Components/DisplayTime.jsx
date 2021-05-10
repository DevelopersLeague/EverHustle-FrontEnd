import React from 'react'
import {useGetTotalFocustimeByDateQuery} from "../Hooks/react-query/focustime-hooks"

function DisplayTime(props) {
    const query = useGetTotalFocustimeByDateQuery(props.dateStr);
    return (
        <div>
            {query.data?query.data.time:"Loading"}
        </div>
    )
}

export default DisplayTime
