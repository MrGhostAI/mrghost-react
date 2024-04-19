// import React, {useContext} from 'react';
// import {
//   Box,
//   Typography,
//   Divider,
// } from '@mui/material';
// import { BotContext } from '../../contexts/BotContext';
// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
// // import PulsatingDot from './PulsatingDot';
// import { theme } from '../Theme';
// import { ChatContext } from '../../contexts/ChatProvider';

// export default function PromoteMessage({ open, setOpen, setIsChatOpen } : { open: boolean; setOpen: (open: boolean) => void; setIsChatOpen: (open: boolean) => void; }) {
//   const { bot } = useContext(BotContext);
//   const chatStyles = {
//     ...theme.components.DefaultChatStyles,
//     ...(bot?.styles || {}),
//   };
//   const { newMessages } = useContext(ChatContext);
//   const [grow, setGrow] = React.useState(false);

//   // check if mouse is hovering over the card
//   const handleMouseEnter = () => {
//     setGrow(true);
//   };

//   return (
//     //   <Box
//     //     sx={{
//     //       transform: `scale(${grow ? 1.01 : 1})`, // scales all elements in the box by 1.5 times
//     //       transformOrigin: 'bottom right', // ensures elements scale from the top left corner
//     //       transition: 'all 0.3s ease-in-out',
//     //     }}
//     //   >
//     <Card
//       sx={{
//         position: 'relative',
//         padding: '0rem 1rem 0',
//         width: '15rem',
//         height: '8rem',
//         display: open ? 'flex' : 'none',
//         flexDirection: 'column',
//         backgroundColor: chatStyles?.primaryColor,
//         color: chatStyles?.fontColor,
//         boxShadow: '0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)',
//         zIndex: 100,
//       }}
//       onClick={() => {
//         setOpen(false);
//         setIsChatOpen(true);
//       }}
//     >
//       <IconButton
//         onClick={(e) => {
//           e.stopPropagation();
//           setOpen(false);
//         }}
//         sx={{
//           position: 'absolute',
//           top: '0.25rem',
//           right: '0.25rem',
//           padding: '0.1rem',
//           color: '#DDD',
//         }}
//       >
//         <CloseIcon fontSize="1rem" />
//       </IconButton>
//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           flexGrow: 1,
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginRight: '1rem',
//           }}
//         >
//           <Badge
//             badgeContent={
//               <PulsatingDot color={theme.palette.error.main} />
//             }
//             invisible={!newMessages}
//           >
//             <ChatIcon bot={bot} styles={chatStyles} />
//           </Badge>
//         </Box>
//         <Box>
//           <Typography variant="h6" sx={{ fontWeight: 700 }}>
//             {bot?.name}
//           </Typography>
//           <Typography variant="body2">{bot?.settings?.startMessage}</Typography>
//         </Box>
//       </Box>
//       <Divider />
//       <Button
//         variant="text"
//         sx={{
//           width: '100%',
//           // marginTop: '1rem',
//           padding: '0.5rem 0',
//           display: 'flex',
//           gap: '0.5rem',
//           alignItems: 'center',
//           textAlign: 'left',
//           justifyContent: 'flex-start',
//           '&:hover': {
//             color: 'primary.light',
//             backgroundColor: 'transparent',
//             paddingLeft: '0.3rem',
//           },
//           transition: 'all 0.3s ease-in-out',
//         }}
//         onClick={() => {
//           setOpen(false);
//           setIsChatOpen(true);
//         }}
//       >
//         <Typography fontSize="0.75rem" color={chatStyles?.fontColor}>
//           Start a conversation{' '}
//         </Typography>
//         <ArrowRightAltIcon
//           fontSize="0.75rem"
//           sx={{
//             color: chatStyles?.fontColor,
//           }}
//         />
//       </Button>
//     </Card>
//     //   </Box>
//   );
// }