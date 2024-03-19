def is_leap_year():
    year = str(input("enter a year to check if it is a leap-year"))

    if len(year) > 4 or not year.isdigit() or int(year) < 0:
        print("print a valid year number")
        is_leap_year()

    year = int(year)

    if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:
        print("Leap year!")
    else:
        print("Not a leap year!")

    is_leap_year()





def is_leap(n):
    if len(n) != 4 and n != "0000" and int(n) < 0:
        return False
    if int(n) % 4 != 0:
        return False
    else:
        return True


is_leap_year()
