import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'


const Calendar = () => {

    const handleDateSelect = (selectInfo) =>{
        let title = prompt('enter a valid title')
        let calendarApi = selectInfo.view.calendar 
        calendarApi.unselect()

        if(title){
           calendarApi.addEvent({
             title,
             start:selectInfo.startStr,
             end:selectInfo.endStr
           }) 


           fetch('http://localhost:3000/api/events',{
            method: 'Post',
            headers:  {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                title: title,
                start:selectInfo.startStr,
                end:selectInfo.endStr
            })
           })
        }

    }
  return (
    <div>
        <FullCalendar
          initialViews ='timeGridDay'
          headerToolbar ={
            {
                left: 'prev,next, today addEventButton',
                center:'title',
                right:'dayGridMonth, timeGridWeek,timeGridDay'
            }
          }
          plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
          editable={true}
          selectable={true}
          select={handleDateSelect}
          events ={
            {
                url: '',
                color: 'white',
                textColor: 'black'
            }
          }
        />
    </div>
  )
}

export default Calendar