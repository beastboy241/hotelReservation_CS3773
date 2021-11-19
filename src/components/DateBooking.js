import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css'
import moment from 'moment'
const { RangePicker } = DatePicker;
const[fromdate, setfromdate]=useState()   
const[todate,settodate]=useState()

return(
<div className = 'row mt-5'>
  <div className="col-md-3">
  <RangePicker format ='DD-MM-YYYY' onChange={filterByDate}/>
  </div>
</div>

function filterByDate(dates)
{
setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
settodate(moment(dates[1]).format('DD-MM-YYYY'))
}
)
<div> 
<b>
<p> Name:</p>
<p> From Date:{match.params.fromdate}</p>
<p> To Date:{match.params.todate}</p>
<p> Name:</p>
</b>
</div> 
<Route path = '/book/:roomid/:fromdate/:todate' exact component={SingleHotel}/>