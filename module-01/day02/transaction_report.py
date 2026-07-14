# Dictionary to store customer totals
customer_totals = {}

try:
    # Open and read the transactions file
    with open("transactions.txt", "r") as file:
        for line in file:
            # Remove extra spaces/newlines
            line = line.strip()

            # Split the line into name and amount
            name, amount = line.split(",")

            # Add the amount to the customer's total
            if name in customer_totals:
                customer_totals[name] += amount
            else:
                customer_totals[name] = amount

    # Sort customers by total spend (highest first)
    sorted_customers = sorted(
        customer_totals.items(),
        key=lambda customer: customer[1],
        reverse=True
    )

    # Print the report
    print("Transaction Summary")
    print("-------------------")

    for name, total in sorted_customers:
        print(f"{name}: ETB {total}")

    # Write the report to report.txt
    with open("report.txt", "w") as report:
        report.write("Transaction Summary\n")
        report.write("-------------------\n")

        for name, total in sorted_customers:
            report.write(f"{name}: ETB {total}\n")

    print("\nReport saved as report.txt")

except FileNotFoundError:
    print("Error: transactions.txt was not found.")