public class Java {

	public static class Bruh {

		public static class Nest {

			public static class WhyIsThisSoNested {

				public static class ThisShouldNotBeThisNested {

					public static class INeededItToBeMoreNestedIAmSorryForMyCrimes {

						public static boolean method() {
							return true;
						}
					}
				}
			}
		}
	}

	public static void method(Object... args) {}

	public static void main(String[] args) {
		String susformat = "";

		System.out.print("yummy");

		if (
			true ||
			false &&
			false &&
			true ||
			true &&
			"my string goes here it is an object".isEmpty()
		) {}

		method(
			"my testing method for formatting functions",
			"this will test if the arguments will be wrapped",
			"please wrap this",
			"please wrap im begging you"
		);

		int numberHere = true ||
			false &&
			false ||
			true &&
			"this is a string this is the sound of a string".isEmpty() ||
			false
			? 0
			: 1;

		boolean isTrue =
			Bruh.Nest.WhyIsThisSoNested.ThisShouldNotBeThisNested.INeededItToBeMoreNestedIAmSorryForMyCrimes.method() &&
			false;
	}
}
