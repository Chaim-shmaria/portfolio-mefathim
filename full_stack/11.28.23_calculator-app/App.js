import { useState } from "react";

function App() {
	const [calc, setCalc] = useState("0");
	const [result, setResult] = useState("");
	var newCalc = false;

	const ops = ['/' , '+', '-', '.', '+-', '%', '*'];

	const plusMinus = () => {
		setCalc((parseFloat(calc) * -1).toString())
	};

	const updateCalc = value => {
		// reset calc
		if (value === 'C') { reset(); return }

		// change plus minus
		if (value === '+-') { plusMinus(); return } 

		// calculate
		if (value === '=') { calculate(); return } 

		// take care of dots
		if (value === '.' && eval(parseFloat(calc) + value)) {
			if (calc === '') {return setCalc('0.')}
			setCalc((calc + value).toString);
		}

		// 
		if (newCalc === true && !ops.includes(value)) 
		{setCalc(value.toString()); newCalc = false; return}

		// if value is an operator and calc is empty or we alredy have a dot
		if ((ops.includes(value) && calc === '')||
			(calc.includes('.') && value === '.')){return}


		// isk what is this
		if (calc.slice(0) === '0'&& !ops.includes(calc.slice(0))) 
		{setCalc(value); return;}

		// value is operator and last unit is an operator => replace
		if (ops.includes(value) && ops.includes(calc.slice(-1))) 
		{setCalc(calc.slice(0, -1) + value); return;}



		// maintain result
		if (!ops.includes(value)) {
			setResult(eval(calc + value).toString());}
		
		// add digits to sequence
		setCalc(calc + value)
		}

	const createButtons = () => {
		const signs = ['C', '+-', '%', '/', '7', '8', '9',
			'*', '4', '5', '6', '-', '1', '2', '3', '+',
			'0', '.', '=']
		return signs.map((sign)=> <button 
		onClick={()=> updateCalc(sign)}>{sign}</button>);
		
	}




	const calculate = () => {
		// if last sign is an opertor - don't do anything
		if (ops.includes(calc.slice(-1))) {
			return;
		}
		setCalc(result);
		newCalc = true
	}

	// const deleteLast = () => {
	// 	if (calc === '') 
	// 	{ return; }
		
	// 	const value = calc.slice(0, -1);

	// 	setCalc(value);}


	const reset = () => {
		setCalc('');
	


	}
	return (
		<div className="App">
			<div className="calculator">
				<div className="display">
					{result ? <span>({result})</span> : ''}&nbsp;
					{calc || "0"}
				</div>
				<div className="digits">
				
						{ createButtons() }

				</div>
			</div>
		</div>
	);
}

export default App;
