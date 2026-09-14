package com.interiorai.backend.util;

import java.text.NumberFormat;
import java.util.Locale;

public final class CurrencyUtils {

    private static final Locale INDIA_LOCALE = new Locale("en", "IN");

    private CurrencyUtils() {}

    public static String formatInr(Double amount) {
        if (amount == null) return "₹0";
        NumberFormat formatter = NumberFormat.getCurrencyInstance(INDIA_LOCALE);
        return formatter.format(Math.round(amount));
    }

    public static String formatNumber(Double number) {
        if (number == null) return "0";
        NumberFormat formatter = NumberFormat.getNumberInstance(INDIA_LOCALE);
        return formatter.format(Math.round(number));
    }
}
