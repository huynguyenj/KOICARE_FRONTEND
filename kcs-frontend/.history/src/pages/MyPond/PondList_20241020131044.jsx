import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { deletePond, getAllPond } from '../../api/pond_fish';
import { toast } from 'react-toastify';





function PondList() {
    const pondList = [
        {
            id: '1',
            name: "Crystal Lake",
            fishCount: 150,
            creationDate: "2020-05-15",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '2',
            name: "Sunset Pond",
            fishCount: 75,
            creationDate: "2019-08-22",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '3',
            name: "Meadow Waters",
            fishCount: 200,
            creationDate: "2021-03-10",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '4',
            name: "Tranquil Oasis",
            fishCount: 120,
            creationDate: "2018-11-30",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '5',
            name: "Whispering Willows",
            fishCount: 180,
            creationDate: "2022-02-14",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '6',
            name: "Serene Springs",
            fishCount: 95,
            creationDate: "2020-09-01",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '7',
            name: "Misty Shores",
            fishCount: 220,
            creationDate: "2019-04-18",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '8',
            name: "Mysterious Lake",
            fishCount: 220,
            creationDate: "2019-04-18",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        }
    ];
    
    const[pondss,setPondss] = useState([]);
        
    useEffect(()=>{
      getPonds();
    },[])

    const getPonds = async()=>{
        getAllPond().then((res)=>setPondss(res.result))
    }

    const handleDeltePond = async(pondId)=>{
       try {
        await deletePond(pondId)
        toast.success("Xóa hồ thành công")
       } catch (error) {
        console.log(error)
        toast.error("Xóa hồ thất bại!")
       }
        
    }
    return (

        <div style={style.pondList}>
            {pondss.map((pond) => (
                <div key={pond.id} style={style.pondItem}>
                    <Grid container columnSpacing={0} columnGap={0}>
                        <Grid item xs={12} sm={8}><h2 style={style.h2}>{pond.pondName}</h2></Grid>
                        <Grid item xs={12} sm={4} container spacing={8}>
                            <Grid item xs={6} sm={2}>
                                <Button component={Link} to={`/userhome/pondlist/pondinfo/${pond.pondId}`} className="btn btn-light" style={{ justifyContent: 'center' }} >
                                    <VisibilityIcon style={{ color: '#000000' }} />
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Button className="btn btn-light" style={{ justifyContent: 'center' }}
                                    onClick={() => handleDelete(pond.pondId)} >
                                    <DeleteOutlineIcon style={{ color: '#000000' }} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', padding: '2px' }}>
                        <img src={pond.pondImg} alt="Pond Image" style={style.image} />
                        <p style={style.p}>Number of fish: {pond.fishResponses}</p>
                        <p style={style.p}>Created on: {new Date(pond.date).toLocaleDateString()}</p>
                    </Grid>

                </div>
            ))}
        </div>
    );
}

export default PondList;