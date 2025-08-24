import re
# from unit_converter_logic import unit_conversion

class AIAssistant:
    def __init__(self):
        self.patterns = {
            'explain': r"explain|what is|tell me about",
            'navigation': {
                'bmi': r"bmi|body mass index",
                'currency': r"currency|exchange rate",
                'date': r"date|date calculator",
                'loan': r"loan|mortgage",
                'tip': r"tip|bill splitter",
                'age': r"age|age calculator",
                'unit': r"unit|convert|conversion",
                'percentage': r"percentage|percent",
                'standard': r"standard|basic calculator",
                'scientific': r"scientific|advanced calculator"
            },
            'calculation': r"(\d+\s*[\+\-\*\/]\s*\d+)",
            'conversion': r"convert\s+(\d+\.?\d*)\s*(\w+)\s+to\s+(\w+)",
        }
        
        self.explanations = {
            'standard': "The Standard Calculator performs basic arithmetic operations like addition, subtraction, multiplication, and division.",
            'scientific': "The Scientific Calculator is an advanced tool for complex calculations, including trigonometric, logarithmic, and power functions.",
            'bmi': "The BMI Calculator helps you determine if your body weight is healthy based on your height and weight.",
            'currency': "The Currency Converter allows you to quickly convert a value from one currency to another using up-to-date exchange rates.",
            'date': "The Date Calculator helps you find the duration between two dates or add/subtract time from a specific date.",
            'loan': "The Loan Calculator computes your monthly loan payment, total interest, and total cost based on the loan amount, interest rate, and term.",
            'tip': "The Tip Calculator helps you figure out the tip amount for a bill and can split the total evenly among a group of people.",
            'age': "The Age Calculator determines a person's exact age in years, months, and days based on their date of birth.",
            'unit': "The Unit Converter is a versatile tool that converts values between different units of measurement, such as length, weight, and temperature.",
            'percentage': "The Percentage Calculator solves various percentage problems, including finding a percentage of a value or calculating percentage increases and decreases.",
        }
    
    def process_query(self, query):
        query = query.lower()

        # Check for 'explain' command first
        if re.search(self.patterns['explain'], query):
            for calc_type in self.explanations:
                if re.search(calc_type, query):
                    explanation = self.explanations[calc_type]
                    return {"type": "explanation", "message": explanation}

        # Check for navigation commands
        for calc_type, pattern in self.patterns['navigation'].items():
            if re.search(pattern, query):
                return {"type": "navigation", "calculator": calc_type, "message": f"Opening the {calc_type.capitalize()} calculator for you."}

        # Check for conversion commands
        match = re.search(self.patterns['conversion'], query)
        if match:
            amount_str, from_unit_str, to_unit_str = match.groups()
            amount = float(amount_str)
            try:
                result, full_message = unit_conversion(amount, from_unit_str, to_unit_str)
                return {"type": "calculation", "message": full_message}
            except ValueError as e:
                return {"type": "error", "message": f"Sorry, I couldn't perform that conversion. {str(e)}"}

        # Check for simple arithmetic calculation
        try:
            match = re.search(r"calculate\s+(.+)", query)
            if match:
                expression = match.group(1).replace('x', '*').replace('÷', '/')
                result = eval(expression)
                return {"type": "calculation", "message": f"The result is {result}."}
        except Exception:
            pass

        # Default response for unrecognized commands
        return {"type": "error", "message": "I'm sorry, I don't understand that command. Try asking for a calculation or to open a specific calculator."}