import React, {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Contact from '../Components/Contact'
import {useGetAllRemindersQuery, useDeleteOneReminderMutation, useCreateOneReminderMutation} from '../Hooks/react-query/reminder-hooks'
import { useQueryClient } from 'react-query';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import RevoCalendar from 'revo-calendar'
import 'revo-calendar/dist/index.css'
import Loading from '../Components/Loading'
import { Alert } from 'reactstrap'

const Reminders = () => {
  
  /*
  react query hooks
  */
  const ReminderQuery = useGetAllRemindersQuery()
  const DeleteMutation = useDeleteOneReminderMutation()
  const CreateReminderMutation = useCreateOneReminderMutation()
  const client = useQueryClient()
  
  // props hooks
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
  const [detailDefault, setDetailDefault] = useState(true)
  
  const [timeFormat24, setTimeFormat24] = useState(true)
  const [showAllDayLabel, setShowAllDayLabel] = useState(false)
  const [detailDateFormat, setDetailDateFormat] = useState('DD/MM/YYYY')
  const [sidebarDefault, setSidebarDefault] = useState(false)
  // evennts
  const [newEventName, setNewEventName] = useState('')
  // creating date obj
  const [newEventDate, setNewEventDate] = useState(new Date())
  
  const [newEventText, setNewEventText] = useState('')

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

  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);

  function deleteEvent(index) {
    console.log(index);
    DeleteMutation.mutate({ id: ReminderQuery.data.reminders[index].id }, {
      onSuccess: () => {
        client.invalidateQueries('reminders')
        setVisible(!visible)
      }
    })
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
            
        <Alert color="danger" isOpen={visible} toggle={onDismiss} className="ml-3 mr-3">
          Event has been deleted 
        </Alert>
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
                      detailDefault={detailDefault}
                      addEvent={(date) => {
                        setNewEventDate(date)
                        setShowAddEventModal(true)
                      }}
                      sidebarDefault={sidebarDefault}
              /> : <Loading/>
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
                      <label htmlFor="datePicker" className="pr-2">Date <span>&</span> time</label>
                    <DatePicker
                    id="datePicker"
                    selected={newEventDate}
                    onChange={(date) => {
                      date instanceof Date &&
                        setNewEventDate(date)
                    }}
                    showTimeSelect
					          dateFormat='dd/MM/yyyy'
					          className="form-control col-md-8"				
                    />
                  
                    
                    
                    {`${
                      newEventDate.getHours() <= 9
                        ? '0' + newEventDate.getHours()
                        : newEventDate.getHours()
                    }:${
                      newEventDate.getMinutes() <= 9
                        ? '0' + newEventDate.getMinutes()
                        : newEventDate.getMinutes()
                        }`}
                    
                  {/* </label> */}
                </div>
                
                <div className="">
                  <label htmlFor="event-text" className="text-bold">Text </label>
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
