//src/pages/Home.jsx - Not Needed
import schoolEquipment from 'C:/Users/Sriram/school-equipment-portal/src/assets/logo.png';
export default function Home() {
  return (
    <div style={{ padding: '0px', marginTop:'0px' }}>
      <h1>Welcome to School Equipment Lending Portal</h1>
      <img 
        src={schoolEquipment} 
        alt="School Equipment" 
        style={{ width: '80%', maxWidth: '600px', marginTop: '0px', borderRadius: '8px'}}
      />
      <p><b>Request, approve, and manage school equipment efficiently.</b></p>
    </div>
  );
}
