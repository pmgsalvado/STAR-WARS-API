import styles from "@/components/components.module.css"


const ALPHABET = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");


interface AlphabetProps {
  lettersArray: string[];
  onClickHandler: (letter: string) => void;
}

interface AlphabetStatus {
  letter: string;
  status: boolean;
}

export default function Alphabet({lettersArray, onClickHandler}: AlphabetProps){
  
  const alphabetLetterStatus: AlphabetStatus[] = [];
  
  ALPHABET.forEach(letter => {
    if (lettersArray.includes(letter)){
      alphabetLetterStatus.push({
        letter: letter,
        status: true,
      })
    }else{
      alphabetLetterStatus.push({
        letter: letter,
        status: false,
      })
    }
  })


  return (
    <div className={styles.alphabet}>
      <div className={styles.alphabet_container}>
        {alphabetLetterStatus.map(letter => 
          letter.status ?
            <button 
              key={letter.letter}
              onClick={()=> onClickHandler(letter.letter)}
              
              >{letter.letter}</button>
          :
            <button key={letter.letter} disabled>{letter.letter}</button>
          
        )}
      </div>
    </div>
  )

}