import Mic from '@mui/icons-material/Mic';
import PlayArrow from '@mui/icons-material/PlayArrow';
import SaveAs from '@mui/icons-material/SaveAs';
import Upload from '@mui/icons-material/Upload';
import { IconButton } from '@mui/material';

function RecordMp3({ togglePlay, record, uploadRecord, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <IconButton onClick={togglePlay}>
                <PlayArrow />
            </IconButton>
            <IconButton onClick={record}>
                <Mic />
            </IconButton>
            <input
                id='icon-button-file'
                type='file'
                accept='audio/*'
                hidden
                onChange={uploadRecord}
            />
            <label htmlFor='icon-button-file'>
                <IconButton component='span'>
                    <Upload />
                </IconButton>
            </label>
            <IconButton type='submit'>
                <SaveAs />
            </IconButton>
        </form>
    );
}

export default RecordMp3;
