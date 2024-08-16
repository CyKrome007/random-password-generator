import {useCallback, useEffect, useState, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {Slider} from "@mui/material";


const PasswordGenerator = () => {

    const [color, setColor] = useState("white");
    const [textColor, setTextColor] = useState("black");
    // const [border_color, setBorder_color] = useState("grey");
    const border_color = "gray";
    const [shadowColor, setShadowColor] = useState("black");
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [specialCharactersAllowed, setSpecialCharactersAllowed] = useState(false);
    const [password, setPassword] = useState("");

    //useRef hook
    const passwordRef = useRef(null);
    const copyButtonRef = useRef(null);

    const passwordGenerator = useCallback(
        () => {
            let pass = "";
            let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            if(numberAllowed) str += "0123456789";
            if(specialCharactersAllowed) str += "~`!@#$%^&*()_+-={}[]<>,./?;':\"\\|";

            for(let i = 1; i <= length; i++) {
                let char = Math.floor(Math.random() * str.length + 1);
                pass += str[char];
            }
            setPassword(pass);
        },
        [length, numberAllowed, specialCharactersAllowed, setPassword]
    );

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password).then(() => {
            if(!copyButtonRef.current.classList.contains('copied')) {
                copyButtonRef.current.classList.add('copied');
            }

        });

        setTimeout(() => {
            if(copyButtonRef.current.classList.contains('copied')) {
                copyButtonRef.current.classList.remove('copied');
            }

        }, 1000);
    }, [password])

    useEffect(() => {
        passwordGenerator()
    }, [length, numberAllowed, specialCharactersAllowed, passwordGenerator]);

    return(
        <>
            <div
                className="flex flex-row min-h-screen items-center justify-center mx-auto duration-200"
                style={{
                    background: color,
                    color: textColor,
                    borderColor: border_color
                }}>
                <div>

                    <div
                        className={'flex rounded-l-full rounded-r-2xl border-2 shadow-xl'}
                        style={{
                            borderColor: border_color,
                            boxShadow: shadowColor,
                        }}
                    >
                        <button className={'px-10 text-5xl'} onClick={() => {
                            setColor(color === 'white' ? 'black' : 'white');
                            setTextColor((color === 'white') ? 'white' : 'black');
                            setShadowColor((color === 'white') ? 'black' : 'white');
                        }}>
                            <FontAwesomeIcon icon={color === "white" ? faMoon : faSun}/>
                        </button>
                        <div className={'flex flex-col border-l-2 p-2'} style={{borderColor: border_color}}>

                            <div className={'flex flex-row justify-center items-center border-b-2 p-2 px-10'}
                                 style={{borderColor: border_color}}>
                                <div className={'mx-2'}>Password Generator</div>
                                <input
                                    type={'text'}
                                    className={'px-3 py-2 rounded-l-full border-l-2 border-y-2'}
                                    style={{
                                        borderColor: border_color,
                                        color: "white",
                                    }}
                                    placeholder={'Password'}
                                    value={password}
                                    ref={passwordRef}
                                    readOnly
                                />
                                <button
                                    className={'px-3 py-2 border-r-2 border-y-2 rounded-r-full'}
                                    style={{
                                        borderColor: border_color,
                                    }}
                                    ref={copyButtonRef}
                                    onClick={copyPasswordToClipboard}

                                >
                                    <FontAwesomeIcon icon={faCopy}/>
                                </button>
                            </div>
                            <div className={'px-16 justify-center items-center'}
                                 style={{borderColor: border_color}}>
                                <Slider
                                    size="small"
                                    value={length}
                                    min={0}
                                    max={20}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                    onChange={(e) => {
                                        setLength(e.target.value)
                                    }}
                                />
                            </div>
                            <div className={'flex flex-row flex-nowrap justify-center items-center pb-2 gap-4'}
                                 style={{borderColor: border_color}}>

                                <p>Length -&gt; {length}</p>

                                <input type={'checkbox'} defaultChecked={numberAllowed}
                                       id={'numberInput'}
                                       className={"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}
                                       onChange={() => setNumberAllowed((prev) => !prev)}
                                />
                                <label htmlFor={'numberInput'}>Number</label>

                                <input type={'checkbox'} defaultChecked={specialCharactersAllowed}
                                       id={'specialCharacterInput'}
                                       className={"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}
                                       onChange={() => setSpecialCharactersAllowed(prev => !prev)}
                                />
                                <label htmlFor={'specialCharacterInput'}>Special Character</label>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PasswordGenerator;