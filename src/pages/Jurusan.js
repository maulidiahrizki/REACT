import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

function Jurusan(){
    const [jrs, setJrsn] = useState([]);
    // const url = "http://localhost:3000/static/";
    useEffect(() => {
        fectData();
    }, []);
    const fectData = async () => {
        try {
            const headers = {
              Authorization: `Bearer ${token}`,
            };
            const response1 = await axios.get('http://localhost:3000/api/jrs', {headers});
             const data1 = await response1.data.data;
            setJrsn(data1);
        } catch (error) {
            // Tangani kesalahan permintaan data
            console.error('Gagal mengambil data:', error);
          }
    }

    const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const [nama_jurusan, setNamaJurusan] = useState('');
        const [validation, setValidation] = useState({});   
        const navigate = useNavigate();

        const handleNamaJurusanChange = (e) => {
            setNamaJurusan(e.target.value);    
        }

            const handleSubmit = async (e) => {
                e.preventDefault();
            
                const formData= {
                nama_jurusan: nama_jurusan,
                };
            
                try {
                const response = await axios.post('http://localhost:3000/api/jrs/store', formData, {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    },
                });
            
                if (response.status === 201) {
                    navigate('/jrs');
                    fectData();
                } else {
                    console.error('Respon tidak berhasil:', response);
                }
                } catch (error) {
                console.error('Kesalahan:', error);
                if (error.response) {
                    console.error('Respon kesalahan:', error.response.data);
                }
                }
            };

    const [editData, setEditData] = useState({
        id_j: null,
        nama_jurusan: ''
    });
    
    const [showEditModal, setShowEditModal] = useState(false);
    
    const handleShowEditModal = (data) => {
        setEditData(data);
        setShowEditModal(true);
        setShow(false);
    };
    
    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };
    
    const handleEditDataChange = (field, value) => {
        setEditData((prevData) => ({
        ...prevData,
        [field]: value,
        }));
    };
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        formData.append('id_j', editData.id_j);
        formData.append('nama_jurusan', editData.nama_jurusan);
    
        try {
        await axios.patch(`http://localhost:3000/api/jrs/update/${editData.id_j}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        navigate('/jrs');
        fectData();
        setShowEditModal(false);
        } catch (error) {
        console.error('Kesalahan: ', error);
        setValidation(error.response.data);
        }
    };
    
    const handleDelete = (id) => {
        axios
        .delete(`http://localhost:3000/api/jrs/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
              }
        })
        .then((response) => {
            console.log('Data berhasil dihapus');
            //Hapus item dari array data jrs
            const updatedjrs = jrs.filter((item) => item.id_j !== id);
            setJrsn(updatedjrs); // perbarui state dengan data yang sudah diperbarui
        })
        .catch((error) => {
            console.error('Gagal menghapus data:', error);
            alert('Gagal menghapus data. Silahkan coba lagi atau hubungi administrator.');
        });
    };
    
    return(
        <Container className="my-4">
        <Row>
          <Col>
            <div className="my-4 p-3 border bg-light">
              <h2 className="text-center">Data Jurusan</h2>
            </div>
          </Col>
        </Row>
        <Row>
            <Col>
            <table className="table table-bordered table-striped table-hover mt-4">
                <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">ID</th>
                    <th scope="col">Nama Jurusan</th>
                    <th scope="col" colSpan={1}>Edit Data</th>
                    <th scope="col" colSpan={1}>Delete Data</th>
                </tr>
                </thead>
                <tbody>
                {jrs.map((jrsn, index) => (
                    <tr key={jrsn.id_j}>
                    <td>{index + 1}</td>
                    <td>{jrsn.id_j}</td>
                    <td>{jrsn.nama_jurusan}</td>
                    <td>
                        <button onClick={() => handleShowEditModal(jrsn)} className="btn btn-info">Edit</button>
                    </td>
                    <td>
                        <button onClick={() => handleDelete(jrsn.id_j)} className="btn btn-danger">Hapus</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </Col>
            <Button variant="success" onClick={handleShow}>Tambah</Button>
        </Row>
            

            {/* tambahData */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nama Jurusan:</label>
                            <input type="text" className="form-control" value={nama_jurusan} onChange={handleNamaJurusanChange} />
                        </div>
                        <button onClick={handleClose} type="submit" className="btn btn-primary">Kirim</button>
                    </form>
                </Modal.Body>
            </Modal>
            
            {/* editData */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="form-label">Nama Jurusan:</label>
                            {/* <input type="text" className="form-control" value={editData ? editData.id_ : ''} onChange={(e) => handleEditDataChange('nama', e.target.value)} /> */}
                            <input type="text" className="form-control" value={editData ? editData.nama_jurusan : ''} onChange={(e) => handleEditDataChange('nama_jurusan', e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Save Change</button>
                    </form>
                </Modal.Body>
            </Modal>

        </Container>
    );
}

export default Jurusan;