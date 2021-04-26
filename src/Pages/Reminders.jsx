import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Contact from '../Components/Contact'

import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import RevoCalendar from 'revo-calendar'
import 'revo-calendar/dist/index.css'


const Reminders = () => {

  // eventlist
  const [eventList, setEventList] = useState([
    {
    name: 'Buyout',
    date: +new Date(),
    allday: true
    },
    {
    name: 'Reservation',
    date: "22/04/2021",
    }
  ])

  const [showAddEventModal, setShowAddEventModal] = useState(false)
  const [secondaryColor, setSecondaryColor] = useState('#D7E6EE')
  const [highlightToday, setHighlightToday] = useState(true)
  const [primaryColor, setPrimaryColor] = useState('#4F6995')

  const [todayColor, setTodayColor] = useState('#3B3966')
  const [textColor, setTextColor] = useState('#333333')
  const [indicatorColor, setIndicatorColor] = useState('orange')
  const [animationSpeed, setAnimationSpeed] = useState(300)
  const [sidebarWidth, setSidebarWidth] = useState(180)
  const [detailWidth, setDetailWidth] = useState(280)
  const [showDetailToggler, setShowDetailToggler] = useState(true)
  const [showSidebarToggler, setShowSidebarToggler] = useState(true)
  const [onePanelAtATime, setOnePanelAtATime] = useState(false)
  const [allowDeleteEvent, setAllowDeleteEvent] = useState(true)
  const [allowAddEvent, setAllowAddEvent] = useState(true)
  const [openDetailsOnDateSelection, setOpenDetailsOnDateSelection] = useState(
    true
  )
  
  const [timeFormat24, setTimeFormat24] = useState(true)
  const [showAllDayLabel, setShowAllDayLabel] = useState(false)
  const [detailDateFormat, setDetailDateFormat] = useState('DD/MM/YYYY')

  // evennts
  const [newEventName, setNewEventName] = useState('')
  // creating date obj
  const [newEventDate, setNewEventDate] = useState(new Date())
  
  
  const [newEventText, setNewEventText] = useState('')

  // will always be 'NA for now'
  const [category, setCategory] = useState('NA')
    /*
    ===========================================
    CRUD FUNCTIONS
    ==========================================
    */
  
  function deleteEvent(id) {
    var temp = eventList
    temp.splice(id, 1)  // at position id remove 1 item
    setEventList(temp)
  }

  function addEvent() {
    // close modal once clicked on enter
    setShowAddEventModal(false)
    var newEvent = {
      id: "Some id",
      name: newEventName,
      // probably iso strig to be added here
      date: (+newEventDate),
    //   category: "NA"
    }

    var temp = eventList
    temp.push(newEvent)
    setEventList([...temp])
  }
  
    return (
        <>
            <header className="header text-center mt-4 ">
                <div className="heading_text">
                    <h3>Reminders</h3>
                </div>
                <p>You will receive a reminder on the event day</p>
            </header>
            
            <section className="mt-3">
                <div className="mx-auto">
                    <RevoCalendar
                      events={eventList}
                      date={new Date()}
                      deleteEvent={deleteEvent}
                      highlightToday={highlightToday}
                      primaryColor={primaryColor}
                      secondaryColor={secondaryColor}
                      todayColor={todayColor}
                      textColor={textColor}
                      indicatorColor={indicatorColor}
                      animationSpeed={animationSpeed}
                      sidebarWidth={sidebarWidth}
                      detailWidth={detailWidth}
                      showDetailToggler={showDetailToggler}
                      showSidebarToggler={showSidebarToggler}
                      onePanelAtATime={onePanelAtATime}
                      allowDeleteEvent={allowDeleteEvent}
                      allowAddEvent={allowAddEvent}
                      openDetailsOnDateSelection={openDetailsOnDateSelection}
                      timeFormat24={timeFormat24}
                      showAllDayLabel={showAllDayLabel}
                      detailDateFormat={detailDateFormat}
                      addEvent={(date) => {
                        setNewEventDate(date)
                        setShowAddEventModal(true)
                      }}
                    />
                </div>
                <Modal isOpen={showAddEventModal}>
                <ModalHeader >Add your own event: </ModalHeader>
                {/* <form action=""> */}
                <ModalBody>
            
                  <div className="form-group">
                      <label htmlFor="event-name">Event name</label>
                  <input
                    type="text"
                    name="event-name"
                    id="event-name"
                    className="form-control"
                    value={newEventName}
                    onChange={(e)=>setNewEventName(e.target.value)}
                    required
                  />
                  </div>
                  <div className="form-group">
                      <label htmlFor="event-date">Date</label>
                    <DatePicker
                    id="datePicker"
                    selected={newEventDate}
                    onChange={(date) => {
                      date instanceof Date &&
                        setNewEventDate(date)
                    }}
                    showTimeSelect
					dateFormat='dd/MM/yyyy'
					className="form-control"				
                  />
                  
                  <label className='timeDisplay form-control form-group' htmlFor='datePicker'>{`${
                    newEventDate.getHours() <= 9
                      ? '0' + newEventDate.getHours()
                      : newEventDate.getHours()
                  }:${
                    newEventDate.getMinutes() <= 9
                      ? '0' + newEventDate.getMinutes()
                      : newEventDate.getMinutes()
                    }`}</label>                  
                </div>
                
                <div className="">
                  <label htmlFor="event-text">Text </label>
					<input
					className="event-text form-control"				
                    type='text'
                    value={newEventText}
                    onChange={(e) => setNewEventText(e.target.value)}
                  />
				</div>
							
                </ModalBody>
                <ModalFooter>
				<button className="btn-note colorPickerBtn" disabled={newEventName === ''} onClick={addEvent}>Create!</button>
                <button className="btn-note">Cancel</button>
				</ModalFooter>
					<div onClick={()=> setShowAddEventModal(false)}/>
             {/* </form> */}
            </Modal>
        </section>

        <Contact/>
        </>
    )
}

export default Reminders
