import { IconProps } from "../../components/types";

export const FolderIcon = ({ active }: IconProps) => (
  <svg
    width="18"
    height="15"
    viewBox="0 0 18 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.125 3H12.75V1.125L12.125 0.5H5.875L5.25 1.125V3H0.875L0.25 3.625V13.625L0.875 14.25H17.125L17.75 13.625V3.625L17.125 3ZM6.5 1.75H11.5V3H6.5V1.75ZM16.5 4.25V5.2L11.5 8V7.375L10.8875 6.75H7.1375L6.5 7.375V8L1.5 5.1375V4.25H16.5ZM10.25 8V9.25H7.75V8H10.25ZM1.5 13V6.575L6.5 9.4375V9.875L7.125 10.5H10.875L11.5 9.875V9.4875L16.5 6.6375V13H1.5Z"
      fill={active ? "var(--primary)" : "black"}
    />
  </svg>
);

export const DeleteIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0,0,256,256"
    width="20px"
    height="20px"
    fill-rule="nonzero"
    style={{ cursor: "pointer" }}
  >
    <g
      fill="#df3333"
      fill-rule="nonzero"
      stroke="none"
      stroke-width="1"
      stroke-linecap="butt"
      stroke-linejoin="miter"
      stroke-miterlimit="10"
      stroke-dasharray=""
      stroke-dashoffset="0"
      font-family="none"
      font-weight="none"
      font-size="none"
      text-anchor="none"
    >
      <g transform="scale(3.2,3.2)">
        <path d="M37,6c-1.64497,0 -3,1.35503 -3,3v1h-9.52734c-1.89168,0 -3.62621,1.07202 -4.47266,2.76367l-1.11719,2.23633h-3.38281c-1.92119,0 -3.5,1.57881 -3.5,3.5c0,1.92119 1.57881,3.5 3.5,3.5h0.58008l3.61719,43.41602c0.21549,2.58219 2.3924,4.58398 4.98438,4.58398h30.63867c2.59122,0 4.76693,-2.0018 4.98242,-4.58398l3.61719,-43.41602h0.58008c1.92119,0 3.5,-1.57881 3.5,-3.5c0,-1.92119 -1.57881,-3.5 -3.5,-3.5h-3.38281l-1.11719,-2.23633c-0.84645,-1.69165 -2.58098,-2.76367 -4.47266,-2.76367h-9.52734v-1c0,-1.64497 -1.35503,-3 -3,-3zM37,8h6c0.56503,0 1,0.43497 1,1v1h-8v-1c0,-0.56503 0.43497,-1 1,-1zM24.47266,12h10.35938c0.10799,0.01785 0.21818,0.01785 0.32617,0h9.67383c0.10799,0.01785 0.21818,0.01785 0.32617,0h10.36914c1.13832,0 2.17404,0.63986 2.68359,1.6582l1.67187,3.3418h4.61719c0.84081,0 1.5,0.65919 1.5,1.5c0,0.84081 -0.65919,1.5 -1.5,1.5h-0.41406h-48.17188h-0.41406c-0.84081,0 -1.5,-0.65919 -1.5,-1.5c0,-0.84081 0.65919,-1.5 1.5,-1.5h4.61719l1.67187,-3.3418c0.50955,-1.01835 1.54527,-1.6582 2.68359,-1.6582zM24,15c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM28,15c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM32,15c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM36,15c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM40,15c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM44,15c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM48,15c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM52,15c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM56,15c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM18.08594,22h43.82812l-3.60547,43.24805c-0.13051,1.56381 -1.4195,2.75195 -2.98828,2.75195h-30.63867c-1.57003,0 -2.85973,-1.18814 -2.99023,-2.75195zM54.76953,26.02734l-0.6875,0.57617l-0.08008,0.3418l-0.00586,0.09961l0.35742,0.82227l0.87305,0.20508l0.68555,-0.57617l0.08008,-0.3418l0.00586,-0.09961l-0.35742,-0.82227zM39.7168,26.04102l-0.6543,0.61133l-0.0625,0.34766v0.09961l0.40234,0.80078l0.88086,0.1582l0.6543,-0.61133l0.0625,-0.34766v-0.09961l-0.40234,-0.80078zM24.66602,26.05859l-0.62109,0.64648l-0.04297,0.34961l0.00586,0.09961l0.44336,0.77734l0.88867,0.11133l0.62109,-0.64648l0.04297,-0.35156l-0.00586,-0.09961l-0.44336,-0.77734zM54.54688,30.12109l-0.68555,0.57617l-0.08203,0.34375l-0.00391,0.09961l0.35742,0.82031l0.87109,0.20508l0.6875,-0.57422l0.08008,-0.34375l0.00586,-0.09961l-0.35742,-0.82227zM39.7168,30.14063l-0.6543,0.61328l-0.0625,0.3457v0.09961l0.40234,0.80273l0.88086,0.15625l0.6543,-0.61133l0.0625,-0.34766v-0.09961l-0.40234,-0.80078zM24.88672,30.15234l-0.62109,0.64648l-0.04297,0.34961l0.00586,0.09961l0.44336,0.77734l0.88867,0.11133l0.62109,-0.64648l0.04297,-0.34961l-0.00391,-0.09961l-0.44531,-0.7793zM54.32617,34.21484l-0.6875,0.57617l-0.08008,0.34375l-0.00586,0.09961l0.35742,0.82031l0.87305,0.20703l0.6875,-0.57617l0.08008,-0.34375l0.00586,-0.09961l-0.35742,-0.82227zM39.7168,34.24023l-0.6543,0.61328l-0.0625,0.3457v0.10156l0.40234,0.80078l0.88086,0.1582l0.6543,-0.61328l0.0625,-0.3457v-0.10156l-0.40234,-0.80078zM25.10742,34.24609l-0.61914,0.64648l-0.04492,0.34961l0.00586,0.09961l0.44336,0.77734l0.89063,0.11133l0.61914,-0.64648l0.04492,-0.34961l-0.00586,-0.09961l-0.44531,-0.7793zM54.10547,38.30859l-0.6875,0.57617l-0.08008,0.34375l-0.00586,0.09961l0.35742,0.82227l0.87305,0.20508l0.68555,-0.57617l0.08203,-0.34375l0.00391,-0.09961l-0.35742,-0.82227zM25.32813,38.33984l-0.61914,0.64648l-0.04297,0.34961l0.00391,0.09961l0.44531,0.7793l0.88867,0.10938l0.62109,-0.64648l0.04297,-0.34961l-0.00586,-0.09961l-0.44336,-0.7793zM39.7168,38.3418l-0.6543,0.61133l-0.0625,0.34766v0.09961l0.40234,0.80078l0.88086,0.1582l0.6543,-0.61328l0.0625,-0.3457v-0.09961l-0.40234,-0.80273zM53.88281,42.40234l-0.68555,0.57617l-0.08008,0.34375l-0.00586,0.09961l0.35742,0.82227l0.87109,0.20508l0.6875,-0.57617l0.08008,-0.34375l0.00586,-0.09961l-0.35742,-0.82031zM25.55078,42.43359l-0.62109,0.64648l-0.04297,0.34961l0.00586,0.09961l0.44336,0.7793l0.88867,0.10938l0.62109,-0.64648l0.04297,-0.34961l-0.00586,-0.09961l-0.44336,-0.7793zM39.7168,42.44141l-0.6543,0.61133l-0.0625,0.34766v0.09961l0.40234,0.80078l0.88086,0.1582l0.6543,-0.61133l0.0625,-0.34766v-0.09961l-0.40234,-0.80078zM53.66211,46.49805l-0.68555,0.57422l-0.08203,0.34375l-0.00586,0.09961l0.35938,0.82227l0.87109,0.20508l0.6875,-0.57617l0.08008,-0.34375l0.00586,-0.09961l-0.35742,-0.82031zM25.77148,46.52734l-0.62109,0.64648l-0.04297,0.34961l0.00586,0.09961l0.44336,0.7793l0.89063,0.10938l0.61914,-0.64648l0.04492,-0.34961l-0.00586,-0.09961l-0.44531,-0.77734zM39.7168,46.54102l-0.6543,0.61133l-0.0625,0.34766v0.09961l0.40234,0.80078l0.88086,0.1582l0.6543,-0.61133l0.0625,-0.34766v-0.09961l-0.40234,-0.80078zM53.44141,50.5918l-0.6875,0.57617l-0.08008,0.3418l-0.00586,0.09961l0.35742,0.82227l0.87305,0.20508l0.68555,-0.57617l0.08203,-0.3418l0.00391,-0.10156l-0.35742,-0.82031zM25.99219,50.62109l-0.61914,0.64648l-0.04297,0.34961l0.00391,0.10156l0.44531,0.77734l0.88867,0.10938l0.62109,-0.64648l0.04297,-0.34961l-0.00586,-0.09961l-0.44336,-0.77734zM39.7168,50.64063l-0.6543,0.61328l-0.0625,0.3457v0.09961l0.40234,0.80273l0.88086,0.15625l0.6543,-0.61133l0.0625,-0.34766v-0.09961l-0.40234,-0.80078zM53.21875,54.68555l-0.68555,0.57617l-0.08008,0.3418l-0.00586,0.09961l0.35742,0.82227l0.87305,0.20508l0.68555,-0.57617l0.08008,-0.3418l0.00586,-0.09961l-0.35742,-0.82227zM26.21484,54.7168l-0.62109,0.64648l-0.04297,0.34961l0.00586,0.09961l0.44336,0.77734l0.88867,0.11133l0.62109,-0.64648l0.04297,-0.35156l-0.00586,-0.09961l-0.44336,-0.77734zM39.7168,54.74023l-0.6543,0.61328l-0.0625,0.3457v0.10156l0.40234,0.80078l0.88086,0.1582l0.6543,-0.61328l0.0625,-0.3457v-0.10156l-0.40234,-0.80078zM52.99805,58.7793l-0.68555,0.57617l-0.08203,0.3418l-0.00391,0.10156l0.35742,0.82031l0.87109,0.20508l0.6875,-0.57422l0.08008,-0.34375l0.00586,-0.09961l-0.35742,-0.82227zM26.43555,58.81055l-0.62109,0.64648l-0.04297,0.34961l0.00586,0.09961l0.44336,0.77734l0.89063,0.11133l0.61914,-0.64648l0.04297,-0.34961l-0.00391,-0.10156l-0.44531,-0.77734zM39.7168,58.8418l-0.6543,0.61133l-0.0625,0.34766v0.09961l0.40234,0.80078l0.88086,0.1582l0.6543,-0.61328l0.0625,-0.3457v-0.09961l-0.40234,-0.80273zM52.77734,62.87305l-0.6875,0.57617l-0.08008,0.34375l-0.00586,0.09961l0.35742,0.82031l0.87305,0.20703l0.68555,-0.57617l0.08203,-0.34375l0.00586,-0.09961l-0.35937,-0.82227zM26.65625,62.9043l-0.61914,0.64648l-0.04492,0.34961l0.00586,0.09961l0.44531,0.77734l0.88867,0.11133l0.62109,-0.64648l0.04297,-0.34961l-0.00586,-0.09961l-0.44336,-0.7793zM39.7168,62.94141l-0.6543,0.61133l-0.0625,0.34766v0.09961l0.40234,0.80078l0.88086,0.1582l0.6543,-0.61133l0.0625,-0.34766v-0.09961l-0.40234,-0.80078z"></path>
      </g>
    </g>
  </svg>
);

export const LocatinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.2483 4.03139C15.1277 2.91085 13.6142 2.27173 12.0297 2.25H11.9697C10.3851 2.27173 8.87159 2.91085 7.75104 4.03139C6.6305 5.15193 5.99138 6.66546 5.96965 8.25C5.94952 9.37542 6.26605 10.4812 6.87865 11.4255L11.5998 21H12.3995L17.1207 11.4255C17.7333 10.4812 18.0498 9.37542 18.0297 8.25C18.0079 6.66546 17.3688 5.15193 16.2483 4.03139ZM11.8857 3.75L12.0087 3.765L12.1197 3.75C13.298 3.80132 14.4119 4.3021 15.2324 5.14939C16.0529 5.99669 16.5177 7.12611 16.5312 8.3055C16.5425 9.14253 16.2981 9.96309 15.8307 10.6575L15.8007 10.7085L15.7752 10.761L11.9997 18.4185L8.22415 10.7685L8.19865 10.71L8.16865 10.659C7.70116 9.96459 7.45677 9.14403 7.46815 8.307C7.48095 7.12625 7.94624 5.99539 8.76813 5.14755C9.59002 4.2997 10.7059 3.79948 11.8857 3.75ZM12.8028 7.0028C12.5562 6.83797 12.2662 6.75 11.9695 6.75C11.5717 6.75 11.1901 6.90804 10.9088 7.18934C10.6275 7.47064 10.4695 7.85218 10.4695 8.25C10.4695 8.54667 10.5575 8.83668 10.7223 9.08336C10.8871 9.33003 11.1214 9.52229 11.3955 9.63582C11.6695 9.74935 11.9711 9.77906 12.2621 9.72118C12.5531 9.6633 12.8204 9.52044 13.0301 9.31066C13.2399 9.10088 13.3828 8.83361 13.4407 8.54264C13.4985 8.25166 13.4688 7.95006 13.3553 7.67598C13.2418 7.40189 13.0495 7.16762 12.8028 7.0028ZM10.3028 5.75559C10.7961 5.42595 11.3761 5.25 11.9695 5.25C12.7651 5.25 13.5282 5.56607 14.0908 6.12868C14.6534 6.69129 14.9695 7.45435 14.9695 8.25C14.9695 8.84334 14.7935 9.42336 14.4639 9.91671C14.1342 10.4101 13.6657 10.7946 13.1175 11.0216C12.5694 11.2487 11.9662 11.3081 11.3842 11.1924C10.8023 11.0766 10.2677 10.7909 9.84816 10.3713C9.42861 9.95176 9.14288 9.41721 9.02713 8.83527C8.91137 8.25333 8.97078 7.65013 9.19784 7.10195C9.42491 6.55377 9.80943 6.08524 10.3028 5.75559Z"
      fill="#C5C5C5"
    />
  </svg>
);

export const EventsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.5 0V1.5L21 3V22.5L19.5 24H4.5L3 22.5V3L4.5 1.5V0H6V1.5H9V0H10.5V1.5H13.5V0H15V1.5H18V0H19.5ZM4.5 22.5H19.5V3H4.5V22.5ZM7.5 6H16.5V7.5H7.5V6ZM16.5 12H7.5V13.5H16.5V12ZM7.5 18H16.5V19.5H7.5V18Z"
      fill="#C5C5C5"
    />
  </svg>
);

export const MessageIcon = () => (
  <svg
    fill="#000000"
    height="800px"
    width="800px"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 60 60"
    xml:space="preserve"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0" />

    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <g id="SVGRepo_iconCarrier">
      {" "}
      <g>
        {" "}
        <path d="M44.348,12.793H2.652C1.189,12.793,0,13.982,0,15.445v43.762l9.414-9.414h34.934c1.463,0,2.652-1.19,2.652-2.653V15.445 C47,13.982,45.811,12.793,44.348,12.793z M10,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S12.206,35.777,10,35.777z M23,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S25.206,35.777,23,35.777z M36,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4 s4,1.794,4,4S38.206,35.777,36,35.777z" />{" "}
        <path d="M57.348,0.793H12.652C11.189,0.793,10,1.982,10,3.445v7.348h34.348c2.565,0,4.652,2.087,4.652,4.652v25.332h11V3.445 C60,1.982,58.811,0.793,57.348,0.793z" />{" "}
      </g>{" "}
    </g>
  </svg>
);

export const LogOutIcon = () => (
  <svg
    fill="#000000"
    height="800px"
    width="800px"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 320.002 320.002"
    xml:space="preserve"
  >
    <g id="XMLID_6_">
      <path
        id="XMLID_7_"
        d="M51.213,175.001h173.785c8.284,0,15-6.716,15-15c0-8.284-6.716-15-15-15H51.213l19.394-19.394
		c5.858-5.858,5.858-15.355,0-21.213c-5.857-5.858-15.355-5.858-21.213,0L4.396,149.393c-0.351,0.351-0.683,0.719-0.997,1.103
		c-0.137,0.167-0.256,0.344-0.385,0.515c-0.165,0.22-0.335,0.435-0.488,0.664c-0.14,0.209-0.261,0.426-0.389,0.64
		c-0.123,0.206-0.252,0.407-0.365,0.619c-0.118,0.22-0.217,0.446-0.323,0.67c-0.104,0.219-0.213,0.435-0.306,0.659
		c-0.09,0.219-0.164,0.442-0.243,0.664c-0.087,0.24-0.179,0.477-0.253,0.722c-0.067,0.222-0.116,0.447-0.172,0.672
		c-0.063,0.249-0.133,0.497-0.183,0.751c-0.051,0.259-0.082,0.521-0.119,0.782c-0.032,0.223-0.075,0.443-0.097,0.669
		c-0.048,0.484-0.073,0.971-0.074,1.457c0,0.007-0.001,0.015-0.001,0.022c0,0.007,0.001,0.015,0.001,0.022
		c0.001,0.487,0.026,0.973,0.074,1.458c0.022,0.223,0.064,0.44,0.095,0.661c0.038,0.264,0.069,0.528,0.121,0.79
		c0.05,0.252,0.119,0.496,0.182,0.743c0.057,0.227,0.107,0.456,0.175,0.681c0.073,0.241,0.164,0.474,0.248,0.71
		c0.081,0.226,0.155,0.453,0.247,0.675c0.091,0.22,0.198,0.431,0.3,0.646c0.108,0.229,0.21,0.46,0.33,0.685
		c0.11,0.205,0.235,0.4,0.354,0.599c0.131,0.221,0.256,0.444,0.4,0.659c0.146,0.219,0.309,0.424,0.466,0.635
		c0.136,0.181,0.262,0.368,0.407,0.544c0.299,0.364,0.616,0.713,0.947,1.048c0.016,0.016,0.029,0.034,0.045,0.05l45,45.001
		c2.93,2.929,6.768,4.394,10.607,4.394c3.838-0.001,7.678-1.465,10.606-4.393c5.858-5.858,5.858-15.355,0.001-21.213L51.213,175.001
		z"
      />
      <path
        id="XMLID_8_"
        d="M305.002,25h-190c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15s15-6.716,15-15V55h160v210.001h-160
		v-45.001c0-8.284-6.716-15-15-15s-15,6.716-15,15v60.001c0,8.284,6.716,15,15,15h190c8.284,0,15-6.716,15-15V40
		C320.002,31.716,313.286,25,305.002,25z"
      />
    </g>
  </svg>
);

export const CancelIcon = ({ onClick, style }) => (
  <svg
    onClick={onClick}
    style={style}
    height="30px"
    width="30px"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 26 26"
    xml:space="preserve"
  >
    <g>
      <path
        fill="#030104"
        d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25
		C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0
		L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467
		L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468
		c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467
		C19.033,16.725,19.033,17.138,18.78,17.394z"
      />
    </g>
  </svg>
);
export const AttachIcon = ({onClick}) => (
  <svg
  onClick={onClick}
    height="30px"
    width="30px"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 280.067 280.067"
    xmlSpace="preserve"
    fill="#c4c4c4"
    stroke="#c4c4c4"
    stroke-width="0.0028006700000000003"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0" />

    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <g id="SVGRepo_iconCarrier">
      {" "}
      <g>
        {" "}
        <path
          fill="#fff"
          d="M149.823,257.142c-31.398,30.698-81.882,30.576-113.105-0.429 c-31.214-30.987-31.337-81.129-0.42-112.308l-0.026-0.018L149.841,31.615l14.203-14.098c23.522-23.356,61.65-23.356,85.172,0 s23.522,61.221,0,84.586l-125.19,123.02l-0.044-0.035c-15.428,14.771-40.018,14.666-55.262-0.394 c-15.244-15.069-15.34-39.361-0.394-54.588l-0.044-0.053l13.94-13.756l69.701-68.843l13.931,13.774l-83.632,82.599 c-7.701,7.596-7.701,19.926,0,27.53s20.188,7.604,27.88,0L235.02,87.987l-0.035-0.026l0.473-0.403 c15.682-15.568,15.682-40.823,0-56.39s-41.094-15.568-56.776,0l-0.42,0.473l-0.026-0.018l-14.194,14.089L50.466,158.485 c-23.522,23.356-23.522,61.221,0,84.577s61.659,23.356,85.163,0l99.375-98.675l14.194-14.089l14.194,14.089l-14.194,14.098 l-99.357,98.675C149.841,257.159,149.823,257.142,149.823,257.142z"
        />{" "}
      </g>{" "}
    </g>
  </svg>
);
export const SendIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0" />

    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.3938 2.20468C3.70395 1.96828 4.12324 1.93374 4.4679 2.1162L21.4679 11.1162C21.7953 11.2895 22 11.6296 22 12C22 12.3704 21.7953 12.7105 21.4679 12.8838L4.4679 21.8838C4.12324 22.0662 3.70395 22.0317 3.3938 21.7953C3.08365 21.5589 2.93922 21.1637 3.02382 20.7831L4.97561 12L3.02382 3.21692C2.93922 2.83623 3.08365 2.44109 3.3938 2.20468ZM6.80218 13L5.44596 19.103L16.9739 13H6.80218ZM16.9739 11H6.80218L5.44596 4.89699L16.9739 11Z"
        fill="#fff"
      />{" "}
    </g>
  </svg>
);

export const ArrowIcon=()=>(
  <svg width="40" height="40" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.646446 3.64645C0.451183 3.84171 0.451183 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM40 3.5L1 3.5V4.5L40 4.5V3.5Z" fill="#514F4F" fill-opacity="0.8"/>
</svg>
)