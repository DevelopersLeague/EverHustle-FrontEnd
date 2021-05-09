import React, {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Contact from '../Components/Contact'
import {useGetAllRemindersQuery, useDeleteOneReminderMutation, useCreateOneReminderMutation} from '../Hooks/react-query/reminder-hooks'
import { useQueryClient } from 'react-query';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import RevoCalendar from 'revo-calendar'
import 'revo-calendar/dist/index.css'


const Reminders = () => {
  
  /*
  react query hooks
  */
  const ReminderQuery = useGetAllRemindersQuery()
  const DeleteMutation = useDeleteOneReminderMutation()
  const CreateReminderMutation = useCreateOneReminderMutation()
  const client = useQueryClient() 
  /*
  {
      "title":"<title of the reminder>" === newEventName
      "content":"<contents of the reminder>" === newEventText
      "category":"<category of the reminder>" == nope
      "timestamp":"<timestamp in the iso format ie YYYY-MM-DDThh:mm:ssTZD (eg 1997-07-16T19:20:30+05:30)>" === date 
      (1997-07-16 10:30:15)
  }
  
  
  */
  // eventlist
  /*
  const [eventList, setEventList] = useState([
    {
    name: 'Buyout',
    date: +new Date(),
    // allday: true,
      extra: {
      text: 'ooo some more text i wonder how many values it can hold hmm quite a few I must say, insert a few more to see the limit'
    }
    },
    
  ])
  */
  
  

  const [showAddEventModal, setShowAddEventModal] = useState(false)
  const [secondaryColor, setSecondaryColor] = useState('#efefef')
  const [highlightToday, setHighlightToday] = useState(true)
  const [primaryColor, setPrimaryColor] = useState('#004D80')

  const [todayColor, setTodayColor] = useState('#3B3966')
  const [textColor, setTextColor] = useState('#333333')
  const [indicatorColor, setIndicatorColor] = useState('orange')
  const [animationSpeed, setAnimationSpeed] = useState(300)
  const [sidebarWidth, setSidebarWidth] = useState(180)
  const [detailWidth, setDetailWidth] = useState(280)
  const [showDetailToggler, setShowDetailToggler] = useState(true)
  const [showSidebarToggler, setShowSidebarToggler] = useState(true)
  const [onePanelAtATime, setOnePanelAtATime] = useState(true)
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
    
    const dataToEventList = (ReminderList) => {
      let EventList =  ReminderList.map((ReminderItem) => {
        return {
          name: ReminderItem.title,
          // newEventText: ReminderItem.content,
          extra: {
            text:  ReminderItem.content,
          },
          date: parseInt((new Date(ReminderItem.timestamp).getTime())),
        }
      })
      console.log(EventList);
      return EventList;
    }
  
  function deleteEvent(index) {
    console.log(index);
    DeleteMutation.mutate({ id: ReminderQuery.data.reminders[index].id }, {
      onSuccess: () => {
        client.invalidateQueries('reminders')
        
      }
    })
    // let temp = eventList
    // temp.splice(id, 1)  // at position id remove 1 item
    // setEventList(temp)

  }
  
  
  function addEvent() {
    setShowAddEventModal(false)
    CreateReminderMutation.mutate({ title: newEventName, content: newEventText, category: "general", timestamp: newEventDate.toISOString() }, {
      onSuccess: () => {
        client.invalidateQueries('reminders')
          setNewEventName('')
          setNewEventText('')
      }
    })
    
  }

  
  const setterText = (e) => {
    e.preventDefault()
    setNewEventText(e.target.value)
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
          <div className="mx-auto pb-3" style={{ zIndex: -10 }}>
            {ReminderQuery.data?
                    <RevoCalendar
                      events={dataToEventList(ReminderQuery.data.reminders)}
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
                      
              /> : "Loading"
            }
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
                    onChange={setterText}
                  />
				</div>
							
                </ModalBody>
                <ModalFooter>
				        <button className="btn-note colorPickerBtn" disabled={newEventName === ''} onClick={addEvent} >Create!</button>
                <button className="btn-note" onClick={()=> setShowAddEventModal(false)}>Cancel</button>
				</ModalFooter>
					{/* <div /> */}
             {/* </form> */}
            </Modal>
        </section>

        <div style={{marginTop: "20px"}}>
          <Contact />
        </div>
        </>
    )
}

export default Reminders
